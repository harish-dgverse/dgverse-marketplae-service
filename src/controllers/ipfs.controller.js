const catchAsync = require('../utils/catchAsync');
const { NFTStorage, Blob } = require('nft.storage');
const config = require('../config/config');

// async function getExampleImage() {
//   const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
//   const r = await fetch(imageOriginUrl)
//   if (!r.ok) {
//     throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
//   }
//   return r.blob()
// }
const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

const createMetadataCid = catchAsync(async (req, res) => {
    const {name, description, properties, type, imageBlob} = req.body;
    const strImage = imageBlob.replace(/^data:image\/[a-z]+;base64,/, "");
    const blob = b64toBlob(strImage, 'image/jpeg');
    // console.log(blob);
    const client = new NFTStorage({ token: config.ipfsApiKey });
    const metadata = {
      name, 
      description, 
      properties,
      type,
      image: blob
    }
    const response = await client.store(metadata);
    console.log(response);
    res.send({metadataCid: response.url}) ;
    // res.send({metadataCid: 'ipfs://bafyreih632pmjql65h5d3arfjwszhmcnpe6chbrlh53ffoumkxqu7hn6ii/metadata.json'}) ;
});

module.exports = {
  createMetadataCid,
};
