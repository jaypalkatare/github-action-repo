export async function convertImage(file, fromFormat, toFormat) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Special handling for different formats
                switch (toFormat) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'webp':
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        }, IMAGE_FORMATS[toFormat].mime);
                        break;

                    // Add special handling for other formats
                    default:
                        reject(new Error(`Conversion to ${toFormat} is not supported in the browser`));
                }
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = event.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}