document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent('https://www.bible.com/verse-of-the-day');

    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            console.log('Fetched HTML:', doc.documentElement.innerHTML);

            const imageElement = doc.querySelector('img[alt*=" - "]');
            console.log('Image Element:', imageElement);

            if (imageElement) {
                const srcset = imageElement.getAttribute('srcset');
                console.log('Srcset:', srcset);

                const srcsetParts = srcset.split(',').map(part => part.trim());
                const highResImage = srcsetParts.find(part => part.endsWith('2x')).split(' ')[0];
                console.log('High Res Image URL:', highResImage);

                if (highResImage) {
                    const fullUrl = 'https://www.bible.com' + highResImage;
                    console.log('Full URL:', fullUrl);
                    const img = document.getElementById('verse-image');
                    img.src = fullUrl;
                    img.style.display = 'block';

                    const text = document.getElementById('verse-text');
                    text.innerHTML = imageElement.alt;
                    adjustTextSize(text, img);
                } else {
                    document.getElementById('verse-text').textContent = "Verse image not found.";
                }
            } else {
                document.getElementById('verse-text').textContent = "Verse image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the verse of the day:', error);
            document.getElementById('verse-text').textContent = "Failed to load verse.";
        });
});

const adjustTextSize = (textElement, imgElement) => {
    const containerWidth = imgElement.clientWidth;
    const containerHeight = imgElement.clientHeight;
    textElement.style.fontSize = `${containerWidth / 20}px`;

    while (textElement.scrollWidth > containerWidth || textElement.scrollHeight > containerHeight) {
        const fontSize = parseFloat(window.getComputedStyle(textElement).fontSize);
        textElement.style.fontSize = `${fontSize - 1}px`;
    }
};
