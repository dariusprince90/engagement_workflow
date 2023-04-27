import { ContainerClient } from '@azure/storage-blob';

/**
 * Uploads a file to a
 * @param {string} containerUrl - The URL for the storage container.
 * @param {string} blobName - The name of the blob in Azure storage. (e.g. /my-folder/fileName.txt)
 * @param {object} file - A file instance (web file api).
 * @param {function} onProgressUpdated - The function to call when the upload progress event is triggered.
 */
export const uploadBlob = async (containerUrl, blobName, file, onProgressUpdated) => {
  const arrayBuffer = await file.arrayBuffer();
  const containerClient = new ContainerClient(containerUrl);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const options = { onProgress: onProgressUpdated };
  await blockBlobClient.uploadData(arrayBuffer, options);
};
