document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];  // Get the uploaded file
    
    if (file) {
        const reader = new FileReader();  // Create a FileReader to read the file

        // When the file is loaded, process the image
        reader.onload = function(e) {
            const img = new Image();  // Create an Image object
            img.src = e.target.result;  // Set the image source to the uploaded file

            img.onload = function() {
                // Display the image properties
                const imageInfoDiv = document.getElementById('imageInfo');
                imageInfoDiv.innerHTML = `
                    <h3>Basic Image Properties</h3>
                    <p><strong>File Name:</strong> ${file.name}</p>
                    <p><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                    <p><strong>File Type:</strong> ${file.type}</p>
                    <p><strong>Image Dimensions:</strong> ${img.width} x ${img.height} pixels</p>
                `;

                // Extract EXIF data using EXIF.js for additional image properties
                if (window.EXIF) {
                    EXIF.getData(img, function() {
                        const exifData = EXIF.getAllTags(this);

                        // Create a string to display EXIF metadata
                        let exifInfo = '<h3>EXIF Data</h3>';
                        for (const tag in exifData) {
                            exifInfo += `<p><strong>${tag}:</strong> ${exifData[tag]}</p>`;
                        }

                        imageInfoDiv.innerHTML += exifInfo;  // Append EXIF data to the div
                    });
                }
            };
        };

        reader.readAsDataURL(file);  // Read the file as a data URL
    } else {
        document.getElementById('imageInfo').innerHTML = "<p>No image selected</p>";
    }
});
