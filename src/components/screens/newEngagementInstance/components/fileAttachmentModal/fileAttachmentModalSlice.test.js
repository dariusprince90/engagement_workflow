import * as reactRedux from 'react-redux';
import faker from '@faker-js/faker';

import * as config from '../../../../../configs/config';
import ATTACHMENT_REFERENCE_TYPES from '../../../../../helpers/enums/attachmentReferenceTypes';
import ATTACHMENT_ACTION_TYPES from '../../../../../helpers/enums/attachmentActionTypes';
import ApiGeneralException from '../../../../../api/ApiGeneralException';
import attachmentInfoResponsesApi from '../../../../../api/newEngagementWorkflow/attachmentInfoResponsesApi';
import * as azureBlobsHelper from '../../../../../helpers/azure/azureBlobsHelper';

import * as slice from './fileAttachmentModalSlice';

import fileAttachmentModalSlice, {
  attachmentTypeChanged,
  createAttachment,
  fileNameChanged,
  modalClosed,
  modalOpened,
  selectAttachment,
  selectIsReadyToUpload,
  selectMetadata,
  selectModalStates,
  selectUploadDetails,
  selectUploadStates,
  uploadProgressChanged,
  uploadStateChanged,
  onUploadProgressUpdated,
  createAttachmentInfoResponse,
  getAttachmentInfoResponseExistsForBlob,
  getBlobName,
  getFileCreationSas,
  uploadAttachment
} from './fileAttachmentModalSlice';

// **********************************************************************
// * constants

const SLICE_NAME = 'neiFileAttachmentModal';

const MODAL_STATES = Object.freeze({
  fileSelection: 1,
  savingAttachment: 2,
  success: 3,
  error: 4
});

const UPLOAD_STATES = Object.freeze({
  preparing: 1,
  uploading: 2,
  creatingAttachment: 3
});

const fakeAttachment = {
  attachments: {
    accountName: faker.random.alphaNumeric(10),
    containerName: faker.random.alphaNumeric(10)
  }
};

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

jest.mock('@azure/storage-blob', () => ({
  ...jest.requireActual('@azure/storage-blob'),
  ContainerClient: jest.fn().mockImplementation(() => ({
    getBlockBlobClient: () => ({ uploadData: jest.fn() })
  }))
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../../../../api/newEngagementWorkflow/attachmentInfoResponsesApi', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    createAzureSas: jest.fn()
  };
});

jest.mock('../../../../../helpers/azure/azureBlobsHelper', () => ({
  uploadBlob: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('fileAttachmentModalSlice', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(attachmentInfoResponsesApi, 'get');
    jest.spyOn(attachmentInfoResponsesApi, 'post');
    jest.spyOn(attachmentInfoResponsesApi, 'createAzureSas');

    config.AzureStorage = fakeAttachment;
  });

  afterAll(() => {
    attachmentInfoResponsesApi.get.mockClear();
    attachmentInfoResponsesApi.post.mockClear();
    attachmentInfoResponsesApi.createAzureSas.mockClear();
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('actions', () => {
    it('sets attachment.attachmentTypeId when attachmentTypeId is dispatched', () => {
      // * ARRANGE
      const fakeAttachmentTypeId = faker.random.alphaNumeric(10);
      const initialState = { attachment: { attachmentTypeId: null } };
      const modifiedState = { attachment: { attachmentTypeId: fakeAttachmentTypeId } };

      // * ACT
      const newState = fileAttachmentModalSlice(
        initialState,
        attachmentTypeChanged({ attachmentTypeId: fakeAttachmentTypeId })
      );

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });

    it('sets attachment.fileName when fileNameChanged is dispatched', () => {
      // * ARRANGE
      const fakeFileName = faker.random.alphaNumeric(10);
      const initialState = { attachment: { fileName: null } };
      const modifiedState = { attachment: { fileName: fakeFileName } };

      // * ACT
      const newState = fileAttachmentModalSlice(initialState, fileNameChanged({ fileName: fakeFileName }));

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });

    it('resets state values when modalClosed is dispatched', () => {
      // * ARRANGE
      const initialState = {
        attachment: {},
        metadata: {},
        uploadDetails: {}
      };

      const modifiedState = {
        attachment: {
          attachmentReferenceTypeId: null,
          attachmentTypeId: '',
          fileName: '',
          newEngagementInstanceId: null,
          responseReferenceId: null
        },
        metadata: {
          error: null,
          isOpen: false,
          modalState: MODAL_STATES.fileSelection
        },
        uploadDetails: {
          percentComplete: 0,
          uploadState: null
        }
      };

      // * ACT
      const newState = fileAttachmentModalSlice(initialState, modalClosed());

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });

    it('sets state values when modalOpened is dispatched', () => {
      // * ARRANGE
      const initialState = {
        metadata: {},
        attachment: {}
      };

      const payload = {
        newEngagementInstanceId: faker.random.alphaNumeric(10),
        attachmentReferenceTypeId: faker.random.alphaNumeric(10),
        responseReferenceId: faker.random.alphaNumeric(10)
      };

      const modifiedState = {
        metadata: { isOpen: true },
        attachment: {
          newEngagementInstanceId: payload.newEngagementInstanceId,
          attachmentReferenceTypeId: payload.attachmentReferenceTypeId,
          responseReferenceId: payload.responseReferenceId
        }
      };

      // * ACT
      const newState = fileAttachmentModalSlice(initialState, modalOpened(payload));

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });

    it('sets uploadDetails.percentComplete when uploadProgressChanged is dispatched', () => {
      // * ARRANGE
      const percentComplete = faker.random.alphaNumeric(10);
      const initialState = { uploadDetails: { percentComplete: null } };
      const modifiedState = { uploadDetails: { percentComplete } };

      // * ACT
      const newState = fileAttachmentModalSlice(initialState, uploadProgressChanged({ percentComplete }));

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });

    it('sets uploadDetails.uploadState when uploadStateChanged is dispatched', () => {
      // * ARRANGE
      const uploadState = faker.random.alphaNumeric(10);
      const initialState = { uploadDetails: { uploadState: null } };
      const modifiedState = { uploadDetails: { uploadState } };

      // * ACT
      const newState = fileAttachmentModalSlice(initialState, uploadStateChanged({ uploadState }));

      // * ASSERT
      expect(newState).toEqual(modifiedState);
    });
  });

  describe('selectors', () => {
    it('returns neiFileAttachmentModal.attachment when selectAttachment is invoked', () => {
      const state = {
        neiFileAttachmentModal: {
          attachment: faker.random.alphaNumeric(10)
        }
      };
      expect(selectAttachment(state)).toEqual(state.neiFileAttachmentModal.attachment);
    });

    it.each([
      {
        fileName: faker.random.alpha(5),
        fileNameTestText: 'has a value',
        attachmentTypeId: faker.datatype.number(),
        attachmentTypeIdTextText: 'has a value',
        modalState: MODAL_STATES.fileSelection,
        modalStateTestText: 'is MODAL_STATES.fileSelection',
        expected: true
      },
      {
        fileName: null,
        fileNameTestText: 'has no value',
        attachmentTypeId: faker.datatype.number(),
        attachmentTypeIdTextText: 'has a value',
        modalState: MODAL_STATES.fileSelection,
        modalStateTestText: 'is MODAL_STATES.fileSelection',
        expected: false
      },
      {
        fileName: faker.random.alpha(5),
        fileNameTestText: 'has a value',
        attachmentTypeId: null,
        attachmentTypeIdTextText: 'has no value',
        modalState: MODAL_STATES.fileSelection,
        modalStateTestText: 'is MODAL_STATES.fileSelection',
        expected: false
      },
      {
        fileName: faker.random.alpha(5),
        fileNameTestText: 'has a value',
        attachmentTypeId: faker.datatype.number(),
        attachmentTypeIdTextText: 'has a value',
        modalState: faker.datatype.number({ min: 2 }),
        modalStateTestText: 'is not MODAL_STATES.fileSelection',
        expected: false
      },
      {
        fileName: faker.random.alpha(5),
        fileNameTestText: 'has a value',
        attachmentTypeId: faker.datatype.number(),
        attachmentTypeIdTextText: 'has a value',
        modalState: null,
        modalStateTestText: 'has no value',
        expected: false
      }
    ])(
      'returns $expected when fileName $fileNameTestText and attachmentTypeId $attachmentTypeIdTextText and modalState is $modalStateTestText',
      ({ fileName, attachmentTypeId, modalState, expected }) => {
        const state = {
          neiFileAttachmentModal: { attachment: { attachmentTypeId, fileName }, metadata: { modalState } }
        };
        expect(selectIsReadyToUpload(state)).toEqual(expected);
      }
    );

    it('returns neiFileAttachmentModal.metadata when selectMetadata is invoked', () => {
      const state = { neiFileAttachmentModal: { metadata: faker.random.alphaNumeric(10) } };
      expect(selectMetadata(state)).toEqual(state.neiFileAttachmentModal.metadata);
    });

    it('returns MODAL_STATES when selectModalStates is invoked', () => {
      expect(selectModalStates()).toEqual(MODAL_STATES);
    });

    it('returns neiFileAttachmentModal.uploadDetails when selectUploadDetails is invoked', () => {
      const state = { neiFileAttachmentModal: { uploadDetails: faker.random.alphaNumeric(10) } };
      expect(selectUploadDetails(state)).toEqual(state.neiFileAttachmentModal.uploadDetails);
    });

    it('returns UPLOAD_STATES when selectUploadStates is invoked', () => {
      expect(selectUploadStates()).toEqual(UPLOAD_STATES);
    });
  });

  describe('functions', () => {
    describe('createAttachmentInfoResponse', () => {
      it('invokes attachmentInfoResponsesApi.post with correct parameters', async () => {
        // * ARRANGE
        const blobName = faker.random.alpha(10);
        const fileName = faker.random.alpha(10);
        const newEngagementInstanceId = faker.datatype.number();
        const attachmentTypeId = faker.datatype.number();
        const attachmentReferenceId = faker.datatype.number();
        const responseReferenceId = faker.datatype.number();
        const filePath = blobName;

        const postData = {
          filePath,
          fileName,
          newEngagementInstanceId,
          attachmentTypeId,
          attachmentReferenceId,
          responseReferenceId
        };

        // * ACT
        await createAttachmentInfoResponse(
          blobName,
          fileName,
          newEngagementInstanceId,
          attachmentTypeId,
          attachmentReferenceId,
          responseReferenceId
        );

        // * ASSERT
        expect(attachmentInfoResponsesApi.post).toHaveBeenCalledWith(postData);
      });

      it('returns correct attachmentInfoResponse', async () => {
        // * ARRANGE
        const blobName = faker.random.alpha(10);
        const fileName = faker.random.alpha(10);
        const newEngagementInstanceId = faker.datatype.number();
        const attachmentTypeId = faker.datatype.number();
        const attachmentReferenceId = faker.datatype.number();
        const responseReferenceId = faker.datatype.number();
        const attachmentInfoResponse = faker.random.alpha(10);
        attachmentInfoResponsesApi.post.mockReturnValue(attachmentInfoResponse);

        // * ACT
        const newAttachmentInfoResponse = await createAttachmentInfoResponse(
          blobName,
          fileName,
          newEngagementInstanceId,
          attachmentTypeId,
          attachmentReferenceId,
          responseReferenceId
        );

        // * ASSERT
        expect(newAttachmentInfoResponse).toBe(attachmentInfoResponse);
      });
    });

    describe('getAttachmentInfoResponseExistsForBlob', () => {
      it('invokes attachmentInfoResponsesApi.get with correct parameters', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const blobName = faker.random.alpha(10);

        const pageSize = 1;
        const pageNumber = 1;
        const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}, filePath eq "${blobName}"`;
        const fields = 'id';

        const expectedArgs = { pageSize, pageNumber, filter, fields };

        attachmentInfoResponsesApi.get.mockReturnValue({ attachmentInfoResponses: faker.datatype.array(5) });

        // * ACT
        await getAttachmentInfoResponseExistsForBlob(newEngagementInstanceId, blobName);

        // * ASSERT
        expect(attachmentInfoResponsesApi.get).toHaveBeenCalledWith(expectedArgs);
      });

      it('returns true when attachmentInfoResponses.length > 0', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const blobName = faker.random.alpha(10);

        attachmentInfoResponsesApi.get.mockReturnValue({ attachmentInfoResponses: faker.datatype.array(5) });

        // * ACT
        const exists = await getAttachmentInfoResponseExistsForBlob(newEngagementInstanceId, blobName);

        // * ASSERT
        expect(exists).toBeTrue();
      });

      it('returns false when attachmentInfoResponses.length is 0', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const blobName = faker.random.alpha(10);

        attachmentInfoResponsesApi.get.mockReturnValue({ attachmentInfoResponses: [] });

        // * ACT
        const exists = await getAttachmentInfoResponseExistsForBlob(newEngagementInstanceId, blobName);

        // * ASSERT
        expect(exists).toBeFalse();
      });
    });

    describe('getBlobName', () => {
      it('return the correct blobName', () => {
        // * ARRANGE
        const attachmentTypeKey = faker.helpers.arrayElement(Object.keys(ATTACHMENT_REFERENCE_TYPES));
        const attachmentReferenceTypeId = ATTACHMENT_REFERENCE_TYPES[attachmentTypeKey].id;
        const fileName = faker.random.alpha(10);
        const folderName = ATTACHMENT_REFERENCE_TYPES[attachmentTypeKey].folderName;
        const expectedBlobName = `${folderName}/${fileName}`;

        // * ACT
        const response = getBlobName(attachmentReferenceTypeId, fileName);

        // * ASSERT
        expect(response).toEqual(expectedBlobName);
      });
    });

    describe('getFileCreationSas', () => {
      it('invokes attachmentInfoResponsesApi.createAzureSas with correct parameters', async () => {
        // * ARRANGE
        const blobName = faker.random.alpha(10);
        const sas = { sasToken: faker.random.alpha(10) };
        const expectedArgs = { attachmentActionTypeId: ATTACHMENT_ACTION_TYPES.create.id, blobName };

        attachmentInfoResponsesApi.createAzureSas.mockReturnValue(sas);

        // * ACT
        await getFileCreationSas(blobName);

        // * ASSERT
        expect(attachmentInfoResponsesApi.createAzureSas).toHaveBeenCalledWith(expectedArgs);
      });

      it('returns the sas token returned from the api', async () => {
        // * ARRANGE
        const blobName = faker.random.alpha(10);
        const expectedSas = { sasToken: faker.random.alpha(10) };

        attachmentInfoResponsesApi.createAzureSas.mockReturnValue(expectedSas);

        // * ACT
        const actual = await getFileCreationSas(blobName);

        // * ASSERT
        expect(actual).toBe(expectedSas);
      });
    });

    describe('onUploadProgressUpdated', () => {
      it('dispatches when uploadProgressChanged when invoked', () => {
        // * ARRANGE
        const fileSize = faker.datatype.number();
        const progress = { loadedBytes: faker.datatype.number() };
        const dispatch = jest.fn();
        const percentComplete = Math.ceil((progress.loadedBytes / fileSize) * 100);
        const expectedAction = { type: `${SLICE_NAME}/uploadProgressChanged`, payload: { percentComplete } };

        // * ACT
        onUploadProgressUpdated(fileSize, progress, dispatch);

        // * ASSERT
        expect(dispatch).toBeCalledWith(expect.objectContaining(expectedAction));
      });
    });

    describe('uploadAttachment', () => {
      it('invokes uploadBlob with correct args', async () => {
        // * ARRANGE
        const file = { arrayBuffer: jest.fn() };
        const blobName = faker.random.alpha(10);
        const sasToken = faker.random.alpha(10);
        const onProgressUpdated = jest.fn();
        const { accountName, containerName } = config.AzureStorage.attachments;

        const expectedContainerUrl = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;

        // * ACT
        await uploadAttachment(file, blobName, sasToken, onProgressUpdated);

        // * ASSERT
        expect(azureBlobsHelper.uploadBlob).toHaveBeenCalledOnceWith(
          expectedContainerUrl,
          blobName,
          onProgressUpdated,
          file.arrayBuffer
        );
      });
    });
  });

  describe('thunks', () => {
    // **********************************************************************
    // * setup

    beforeEach(() => {
      reactRedux.useDispatch.mockReturnValue(mockDispatch);
    });

    // **********************************************************************
    // * tear-down

    // **********************************************************************
    // * execution

    describe('createAttachment', () => {
      // **********************************************************************
      // * setup

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('returns correct action when an attachment info response already exists for this new engagement instance and blob name', async () => {
        // * ARRANGE
        const file = { name: faker.random.alpha(10) };
        const state = {
          neiFileAttachmentModal: {
            attachment: {
              attachmentReferenceTypeId: faker.datatype.number({ min: 1, max: 4 }),
              attachmentTypeId: faker.datatype.number(),
              newEngagementInstanceId: faker.datatype.number(),
              responseReferenceId: faker.datatype.number()
            }
          }
        };

        const getState = jest.fn().mockReturnValue(state);
        const dispatch = jest.fn();

        const blobName = faker.random.alpha(10);
        const exists = true;

        const expectedAction = {
          type: `${SLICE_NAME}/createAttachment/rejected`,
          payload: { message: 'This attachment already exists. Delete the existing attachment before uploading again.' }
        };

        const getBlobNameSpy = jest.spyOn(slice, 'getBlobName');
        const getAttachmentInfoResponseExistsForBlobSpy = jest.spyOn(slice, 'getAttachmentInfoResponseExistsForBlob');

        getBlobNameSpy.mockReturnValue(blobName);
        getAttachmentInfoResponseExistsForBlobSpy.mockReturnValue(exists);

        //  * ACT
        const actual = await createAttachment({ file })(dispatch, getState);

        //  * ASSERT
        expect(actual).toEqual(expect.objectContaining(expectedAction));
      });

      it('returns correct attachmentInfoResponse when no attachment info response already exists for this new engagement instance and blob name', async () => {
        // * ARRANGE
        const file = { name: faker.random.alpha(10), size: faker.datatype.number() };
        const state = {
          neiFileAttachmentModal: {
            attachment: {
              attachmentReferenceTypeId: faker.datatype.number({ min: 1, max: 4 }),
              attachmentTypeId: faker.datatype.number(),
              newEngagementInstanceId: faker.datatype.number(),
              responseReferenceId: faker.datatype.number()
            }
          }
        };

        const getState = jest.fn().mockReturnValue(state);
        const dispatch = jest.fn();

        const blobName = faker.random.alpha(10);
        const exists = false;
        const sas = { sasToken: faker.random.alpha(10) };
        const attachmentInfoResponse = faker.random.alpha(10);
        const progress = faker.datatype.number({ min: 0, max: 100 });

        const expectedAction = { type: `${SLICE_NAME}/createAttachment/fulfilled`, payload: attachmentInfoResponse };

        const getBlobNameSpy = jest.spyOn(slice, 'getBlobName');
        const getAttachmentInfoResponseExistsForBlobSpy = jest.spyOn(slice, 'getAttachmentInfoResponseExistsForBlob');
        const getFileCreationSasSpy = jest.spyOn(slice, 'getFileCreationSas');
        const onUploadProgressUpdatedSpy = jest.spyOn(slice, 'onUploadProgressUpdated');
        const uploadAttachmentSpy = jest.spyOn(slice, 'uploadAttachment');
        const createAttachmentInfoResponseSpy = jest.spyOn(slice, 'createAttachmentInfoResponse');

        getBlobNameSpy.mockReturnValue(blobName);
        getAttachmentInfoResponseExistsForBlobSpy.mockReturnValue(exists);
        getFileCreationSasSpy.mockReturnValue(sas);
        onUploadProgressUpdatedSpy.mockReturnValue(null);
        uploadAttachmentSpy.mockImplementation((file, blobName, sasToken, onProgressUpdated) => {
          onProgressUpdated(file.size, progress, mockDispatch);
          return null;
        });
        createAttachmentInfoResponseSpy.mockReturnValue(attachmentInfoResponse);

        //  * ACT
        const actual = await createAttachment({ file })(dispatch, getState);

        //  * ASSERT
        expect(actual).toEqual(expect.objectContaining(expectedAction));
        expect(onUploadProgressUpdatedSpy).toHaveBeenCalledOnceWith(file.size, progress, mockDispatch);
      });

      it('returns correct action when an error is thrown', async () => {
        //  * ARRANGE
        const file = { name: faker.random.alpha(10) };
        const state = {
          neiFileAttachmentModal: {
            attachment: {
              attachmentReferenceTypeId: faker.datatype.number({ min: 1, max: 4 }),
              attachmentTypeId: faker.datatype.number(),
              newEngagementInstanceId: faker.datatype.number(),
              responseReferenceId: faker.datatype.number()
            }
          }
        };
        const errorMessage = faker.random.alpha(10);

        const getState = jest.fn().mockReturnValue(state);
        const dispatch = jest.fn();

        const expectedAction = {
          type: `${SLICE_NAME}/createAttachment/rejected`,
          error: { message: errorMessage }
        };

        const getBlobNameSpy = jest.spyOn(slice, 'getBlobName');

        getBlobNameSpy.mockImplementation(() => {
          throw new Error(errorMessage);
        });

        //  * ACT
        const actual = await createAttachment({ file })(dispatch, getState);

        //  * ASSERT
        expect(actual.type).toEqual(expectedAction.type);
        expect(actual.error).toEqual(expect.objectContaining(expectedAction.error));
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        //  * ARRANGE
        const file = { name: faker.random.alpha(10) };
        const state = {
          neiFileAttachmentModal: {
            attachment: {
              attachmentReferenceTypeId: faker.datatype.number({ min: 1, max: 4 }),
              attachmentTypeId: faker.datatype.number(),
              newEngagementInstanceId: faker.datatype.number(),
              responseReferenceId: faker.datatype.number()
            }
          }
        };
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };

        const expectedAction = {
          type: `${SLICE_NAME}/createAttachment/rejected`,
          payload: expectedPayload
        };

        const getState = jest.fn().mockReturnValue(state);
        const dispatch = jest.fn();

        const getBlobNameSpy = jest.spyOn(slice, 'getBlobName');

        getBlobNameSpy.mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        //  * ACT
        const actual = await createAttachment({ file })(dispatch, getState);

        //  * ASSERT
        expect(actual).toEqual(expect.objectContaining(expectedAction));
      });
    });
  });

  describe('extra reducers', () => {
    describe('createAttachment', () => {
      it('updates metadata.modalState when createAttachment.pending is invoked', () => {
        // * ARRANGE
        const initialState = { metadata: {} };
        const expectedState = { metadata: { modalState: MODAL_STATES.savingAttachment } };

        // * ACT
        const newState = fileAttachmentModalSlice(initialState, createAttachment.pending());

        // * ASSERT
        expect(newState).toEqual(expectedState);
      });

      it('updates metadata.modalState when createAttachment.fulfilled is invoked', () => {
        // * ARRANGE
        const initialState = { metadata: {} };
        const expectedState = { metadata: { modalState: MODAL_STATES.success } };

        // * ACT
        const newState = fileAttachmentModalSlice(initialState, createAttachment.fulfilled());

        // * ASSERT
        expect(newState).toEqual(expectedState);
      });

      it('updates metadata.modalState and metadata.error when createAttachment.rejected is invoked', () => {
        // * ARRANGE
        const initialState = { metadata: {} };
        const errorMessage = faker.random.alpha(5);
        const expectedState = { metadata: { modalState: MODAL_STATES.error, error: { message: errorMessage } } };

        // * ACT
        const newState = fileAttachmentModalSlice(initialState, createAttachment.rejected(errorMessage));

        // * ASSERT
        expect(newState).toEqual(expectedState);
      });
    });
  });
});
