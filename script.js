document.addEventListener('DOMContentLoaded', function() {
    const unsplashAccessKey = '2YHCIylev3KFxeBcNLpnhXfBr3AFW1MddiZXlSVBlzw';
    const bibleVerseAPI = 'https://beta.ourmanna.com/api/v1/get/?format=json&order=daily';

    // Function to fetch daily Bible verse
    async function fetchVerse() {
        try {
            const response = await fetch(bibleVerseAPI);
            const data = await response.json();
            const verseText = data.verse.details.text + " - " + data.verse.details.reference;
            return verseText;
        } catch (error) {
            console.error('Error fetching the Bible verse:', error);
            return 'Error fetching the verse.';
        }
    }

    // Function to fetch a random image from Unsplash
    async function fetchImage() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=nature&client_id=${unsplashAccessKey}`);
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
