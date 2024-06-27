document.addEventListener('DOMContentLoaded', function() {
    const unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your actual Unsplash Access Key
    const verseAPI = 'https://beta.ourmanna.com/api/v1/get/?format=json&order=daily';

    // Function to fetch daily Bible verse
    async function fetchVerse() {
        try {
            const response = await fetch(verseAPI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const verseText = `${data.verse.details.text} - ${data.verse.details.reference}`;
            return verseText;
        } catch (error) {
            console.error('Error fetching the verse:', error);
            return 'A Bible verse will appear here daily.';
        }
    }

    // Function to fetch a random image from Unsplash
    async function fetchImage() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=bible&client_id=${unsplashAccessKey}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.urls.regular;
        } catch (error) {
            console.error('Error fetching the image:', error);
            return 'https://via.placeholder.com/600x400';
        }
    }

    // Function to update the verse and image on the page
    async function updateVerseAndImage() {
        const verseText = await fetchVerse();
        const imageUrl = await fetchImage();

        document.getElementById('verseText').innerText = verseText;
        document.getElementById('verseImage').src = imageUrl;
    }

    // Initialize the verse and image
    updateVerseAndImage();
});
