import RNFetchBlob from 'rn-fetch-blob'
// const { config, fs } = RNFetchBlob
// let PictureDir = fs.dirs.DocumentDir // this is the pictures directory. You can check the available directories in the wiki.
// const date = new Date       
// let options = {
//   fileCache: true,
//   addAndroidDownloads : {
//     useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
//     notification : true,
//     path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf' , // this is the path where your downloaded file will live in
//     description : 'Downloading image.'
//   }
// }







export default downloadFile = (url) => {
    let dirs = RNFetchBlob.fs.dirs
    let filePath = `${dirs.DocumentDir}/${'rutaAgreement'}.pdf`
    console.log("URL =>" ,url)
    RNFetchBlob.config({
        path: filePath,
        addAndroidDownloads: {
            title: `Ruta Agreement`,
            description: `Ruta Agreement`,
            mediaScannable: true,
            mime: 'application/pdf',
            notification: true
        }
    })
    .fetch('GET', url, {
            // 'Cache-Control': 'no-store'
        })
        .then((res) => {
            console.log('RNFetchBlob ',res.path())
                RNFetchBlob.android.actionViewIntent(res.path(),'application/pdf');
                RNFetchBlob.android.addCompleteDownload({
                    title: `Ruta Agreement`,
                    description: `Ruta Agreement`,
                    mime: 'application/pdf',
                    path: filePath,
                    showNotification: true,
                    notification: true
                  })
        })
        .catch((errorMessage, statusCode) => {
            console.log("ERROR", errorMessage)
      })
}









    
