import React from 'react'

function upload() {
    return (
        <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="myfile" />
        <input type="submit" value="Upload" />
    </form>
      )
}

export default upload