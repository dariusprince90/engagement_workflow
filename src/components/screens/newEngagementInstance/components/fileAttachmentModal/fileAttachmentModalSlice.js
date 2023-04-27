import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as config from '../../../../../configs/config';
import ATTACHMENT_REFERENCE_TYPES from '../../../../../helpers/enums/attachmentReferenceTypes';
import ATTACHMENT_ACTION_TYPES from '../../../../../helpers/enums/attachmentActionTypes';
import ApiGeneralException from '../../../../../api/ApiGeneralException';
import attachmentInfoResponsesApi from '../../../../../api/newEngagementWorkflow/attachmentInfoResponsesApi';
import * as azureBlobsHelper from '../../../../../helpers/azure/azureBlobsHelper';

// import modules that are used as internal methods; this allows mocking the internal modules during testing
// * NOTE: ES6 modules support cyclic dependencies automatically, so it is perfectly valid to import a module
// *       into itself so that functions within the module can call the module export for other functions in the module
import {
  createAttachmentInfoResponse as createAttachmentInfoResponseInternal,
  getAttachmentInfoResponseExistsForBlob as getAttachmentInfoResponseExistsForBlobInternal,
  getBlobName as getBlobNameInternal,
  getFileCreationSas as getFileCreationSasInternal,
  onUploadProgressUpdated as onUploadProgressUpdatedInternal,
  uploadAttachment as uploadAttachmentInternal
} from './fileAttachmentModalSlice';

// **********************************************************************
// * constants

const SLICE_NAME = 'neiFileAttachmentModal';

/**
 * The different states in which the modal can be.
 */
const MODAL_STATES = Object.freeze({
  fileSelection: 1,
  savingAttachment: 2,
  success: 3,
  error: 4
});

/**
 * The different states of the attachment upload process.
 */
const UPLOAD_STATES = Object.freeze({
  preparing: 1,
  uploading: 2,
  creatingAttachment: 3
});

// **********************************************************************
// * functions

/**
 * Create a new attachment info response.
 * @param {string} blobName - The name of the blob in Azure storage. (e.g. /my-folder/fileName.txt)
 * @param {string} fileName - The name of the file. (e.g. fileName.txt)
 * @param {int} newEngagementInstanceId - The new engagement instance id.
 * @param {int} attachmentTypeId - The attachment type id.
 * @param {int} attachmentReferenceId - The attachment reference id.
 * @param {int} responseReferenceId - The response reference id.
 * @returns The new attachment info response object.
 */
export const createAttachmentInfoResponse = async (
  blobName,
  fileName,
  newEngagementInstanceId,
  attachmentTypeId,
  attachmentReferenceId,
  responseReferenceId
) => {
  const data = {
    newEngagementInstanceId,
    fileName,
    filePath: blobName,
    attachmentTypeId,
    attachmentReferenceId,
    responseReferenceId
  };

  const attachmentInfoResponse = await attachmentInfoResponsesApi.post(data);

  return attachmentInfoResponse;
};

/**
 * Checks if an attachment info response exists for a given new engagement instance id and blob name.
 * @param {int} newEngagementInstanceId - The new engagement instance id.
 * @param {string} blobName - The name of the blob in Azure storage. (e.g. /my-folder/fileName.txt)
 * @returns True if the attachment info response exists, false otherwise.
 */
export const getAttachmentInfoResponseExistsForBlob = async (newEngagementInstanceId, blobName) => {
  const pageSize = 1;
  const pageNumber = 1;
  const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}, filePath eq "${blobName}"`;
  const fields = 'id';
  const results = await attachmentInfoResponsesApi.get({ pageSize, pageNumber, filter, fields });
  const exists = results.attachmentInfoResponses.length > 0;

  return exists;
};

/**
 * Gets the blob name for an attachment reference type and file name.
 * @param {int} attachmentReferenceTypeId - The attachment reference type id.
 * @param {string} fileName - The name of the file. (e.g. fileName.txt)
 * @returns The blob name to be used in Azure storage.
 */
export const getBlobName = (attachmentReferenceTypeId, fileName) => {
  const refTypeValues = Object.values(ATTACHMENT_REFERENCE_TYPES);
  const attachmentReferenceType = refTypeValues.find((refType) => refType.id === attachmentReferenceTypeId);
  const folderName = attachmentReferenceType.folderName;
  const blobName = `${folderName}/${fileName}`;

  return blobName;
};

/**
 * Gets the default state for the file attachment modal.
 * @returns An object representing the default state.
 */
const getDefaultState = () => {
  const metadata = {
    isOpen: false,
    modalState: MODAL_STATES.fileSelection,
    error: null
  };

  const uploadDetails = {
    uploadState: null,
    percentComplete: 0
  };

  const attachment = {
    newEngagementInstanceId: null,
    fileName: '',
    attachmentTypeId: '',
    attachmentReferenceTypeId: null,
    responseReferenceId: null
  };

  return { metadata, uploadDetails, attachment };
};

/**
 * Get a shared access signature (SAS) that can be used for creating a specific blob.
 * @param {string} blobName - The name of the blob in Azure storage. (e.g. /my-folder/fileName.txt)
 * @returns A shared access signature (SAS) that can be used to create the blob.
 */
export const getFileCreationSas = async (blobName) => {
  const data = { attachmentActionTypeId: ATTACHMENT_ACTION_TYPES.create.id, blobName };
  const sas = await attachmentInfoResponsesApi.createAzureSas(data);

  return sas;
};

/**
 * Handler for when progress is updated during the file upload to Azure storage.
 * @param {int} fileSize - The size of the file that was uploaded.
 * @param {object} progress - The progress object returned from BlockBlobClient.uploadData.
 * @param {object} dispatch - The redux dispatch object.
 */
export const onUploadProgressUpdated = (fileSize, progress, dispatch) => {
  const { loadedBytes } = progress;
  const percentComplete = Math.ceil((loadedBytes / fileSize) * 100);
  dispatch(uploadProgressChanged({ percentComplete }));
};

/**
 * Upload the attachment to Azure blob storage.
 * @param {object} file - A file instance (web file api).
 * @param {string} blobName - The name of the blob in Azure storage. (e.g. /my-folder/fileName.txt)
 * @param {string} sasToken - The shared access signature (SAS) token that allows the upload of this blob.
 * @param {function} onProgressUpdated - The function to call when the upload progress event is triggered.
 */
export const uploadAttachment = async (file, blobName, sasToken, onProgressUpdated) => {
  const { accountName, containerName } = config.AzureStorage.attachments;
  const containerUrl = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
  await azureBlobsHelper.uploadBlob(containerUrl, blobName, file, onProgressUpdated);
};

// **********************************************************************
// * thunks

/**
 * Create an attachment for a new engagement instance.
 */
export const createAttachment = createAsyncThunk(
  `${SLICE_NAME}/createAttachment`,
  async ({ file }, { getState, dispatch, rejectWithValue }) => {
    try {
      // set upload state to "preparing"
      dispatch(uploadStateChanged({ uploadState: UPLOAD_STATES.preparing }));

      const state = getState();
      const { attachmentReferenceTypeId, attachmentTypeId, newEngagementInstanceId, responseReferenceId } =
        state.neiFileAttachmentModal.attachment;

      // create the blob name
      const blobName = getBlobNameInternal(attachmentReferenceTypeId, file.name);

      // ensure an attachment info response doesn't already exists for this new engagement instance and blob name
      // if so, don't allow the upload and show an error
      const exists = await getAttachmentInfoResponseExistsForBlobInternal(newEngagementInstanceId, blobName);
      if (exists) {
        const message = 'This attachment already exists. Delete the existing attachment before uploading again.';
        return rejectWithValue({ message });
      }

      // generate a sas to upload the blob
      const sas = await getFileCreationSasInternal(blobName);

      // set upload state to "uploading"
      dispatch(uploadStateChanged({ uploadState: UPLOAD_STATES.uploading }));

      // upload the attachment
      const onProgressUpdated = (progress) => onUploadProgressUpdatedInternal(file.size, progress, dispatch);
      await uploadAttachmentInternal(file, blobName, sas.sasToken, onProgressUpdated);

      // set upload state to "creating attachment"
      dispatch(uploadStateChanged({ uploadState: UPLOAD_STATES.creatingAttachment }));

      // create the attachment info response
      const attachmentInfoResponse = await createAttachmentInfoResponseInternal(
        blobName,
        file.name,
        newEngagementInstanceId,
        attachmentTypeId,
        attachmentReferenceTypeId,
        responseReferenceId
      );

      return attachmentInfoResponse;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

// **********************************************************************
// * initial state

const initialState = getDefaultState();

// **********************************************************************
// * slice

const fileAttachmentModalSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    attachmentTypeChanged: (state, action) => {
      const { attachmentTypeId } = action.payload;
      state.attachment.attachmentTypeId = attachmentTypeId;
    },

    fileNameChanged: (state, action) => {
      const { fileName } = action.payload;
      state.attachment.fileName = fileName;
    },

    modalClosed: (state) => {
      // when the modal is closed, reset the entire state
      const { metadata, uploadDetails, attachment } = getDefaultState();
      state.metadata = { ...metadata };
      state.uploadDetails = { ...uploadDetails };
      state.attachment = { ...attachment };
    },

    modalOpened: (state, action) => {
      const { newEngagementInstanceId, attachmentReferenceTypeId, responseReferenceId } = action.payload;

      state.metadata.isOpen = true;
      state.attachment.newEngagementInstanceId = newEngagementInstanceId;
      state.attachment.attachmentReferenceTypeId = attachmentReferenceTypeId;
      state.attachment.responseReferenceId = responseReferenceId;
    },

    uploadProgressChanged: (state, action) => {
      const { percentComplete } = action.payload;
      state.uploadDetails.percentComplete = percentComplete;
    },

    uploadStateChanged: (state, action) => {
      const { uploadState } = action.payload;
      state.uploadDetails.uploadState = uploadState;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(createAttachment.pending, (state) => {
      state.metadata.modalState = MODAL_STATES.savingAttachment;
    });

    builder.addCase(createAttachment.fulfilled, (state) => {
      state.metadata.modalState = MODAL_STATES.success;
    });

    builder.addCase(createAttachment.rejected, (state, action) => {
      const { payload, error } = action;
      state.metadata.modalState = MODAL_STATES.error;
      state.metadata.error = payload || error;
    });
  }
});

// **********************************************************************
// * actions

export const {
  attachmentTypeChanged,
  fileNameChanged,
  modalClosed,
  modalOpened,
  uploadProgressChanged,
  uploadStateChanged
} = fileAttachmentModalSlice.actions;

// **********************************************************************
// * selectors

/**
 * Select the modal attachment.
 * @param {object} state - The redux state object.
 * @returns The the attachment object from the neiFileAttachmentModal state.
 */
export const selectAttachment = (state) => state.neiFileAttachmentModal.attachment;

/**
 * Determine if the modal is ready to upload an attachment.
 * @description isReadyToUpload is true when both attachment.fileName and attachment.attachmentTypeId have values
 * AND the modal is in the fileSelection state.
 * @param {object} state - The redux state object.
 * @returns True if the modal is ready to upload, false otherwise.
 */
export const selectIsReadyToUpload = (state) =>
  !!state.neiFileAttachmentModal.attachment.fileName &&
  !!state.neiFileAttachmentModal.attachment.attachmentTypeId &&
  state.neiFileAttachmentModal.metadata.modalState === MODAL_STATES.fileSelection;

/**
 * Select the modal metadata.
 * @param {object} state - The redux state object.
 * @returns The the metadata object from the neiFileAttachmentModal state.
 */
export const selectMetadata = (state) => state.neiFileAttachmentModal.metadata;

/**
 * Select the modal states.
 * @returns All possible modal states.
 */
export const selectModalStates = () => MODAL_STATES;

/**
 * Select the modal upload details.
 * @param {object} state - The redux state object.
 * @returns The the uploadDetails object from the neiFileAttachmentModal state.
 */
export const selectUploadDetails = (state) => state.neiFileAttachmentModal.uploadDetails;

/**
 * Select the upload states.
 * @returns All possible upload states.
 */
export const selectUploadStates = () => UPLOAD_STATES;

// **********************************************************************
// * reducer

export default fileAttachmentModalSlice.reducer;
