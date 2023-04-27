import * as azureStorageBlob from '@azure/storage-blob';
import faker from '@faker-js/faker';

import * as azureBlobsHelper from './azureBlobsHelper';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

jest.mock('@azure/storage-blob');

// **********************************************************************
// * unit tests

describe('azureBlobsHelper', () => {
  describe('uploadBlob', () => {
    it('uploads the file with the proper options', async () => {
      // * ARRANGE
      const containerUrl = faker.random.alpha(10);
      const blobName = faker.random.alpha(10);
      const fileArrayBuffer = faker.datatype.array();
      const arrayBuffer = jest.fn().mockResolvedValue(fileArrayBuffer);
      const file = { arrayBuffer };
      const onProgressUpdated = jest.fn();
      const uploadDataOptions = { onProgress: onProgressUpdated };

      const mockUploadData = jest.fn();
      const mockGetBlockBlobClient = jest.fn();

      azureStorageBlob.ContainerClient.mockImplementation(() => ({ getBlockBlobClient: mockGetBlockBlobClient }));
      mockGetBlockBlobClient.mockImplementation(() => ({ uploadData: mockUploadData }));

      // * ACT
      await azureBlobsHelper.uploadBlob(containerUrl, blobName, file, onProgressUpdated);

      // * ASSERT
      expect(azureStorageBlob.ContainerClient).toHaveBeenCalledOnceWith(containerUrl);
      expect(mockGetBlockBlobClient).toHaveBeenCalledOnceWith(blobName);
      expect(mockUploadData).toHaveBeenCalledOnceWith(fileArrayBuffer, uploadDataOptions);
    });
  });
});
