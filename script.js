document.addEventListener('DOMContentLoaded', function() {
    // List of sample Bible verses
    const verses = [
        {
            text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
            image: "https://example.com/path-to-your-image1.jpg"
        },
        {
            text: "I can do all things through him who strengthens me. - Philippians 4:13",
            image: "https://example.com/path-to-your-image2.jpg"
        },
        {
            text: "The Lord is my shepherd; I shall not want. - Psalm 23:1",
            image: "https://example.com/path-to-your-image3.jpg"
        },
        // Add more verses and images as needed
    ];

    // Function to get today's verse
    function getTodaysVerse() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        return verses[dayOfYear % verses.length];
    }

    // Set the verse and image
    const verse = getTodaysVerse();
    document.getElementById('verseText').innerText = verse.text;
    document.getElementById('verseImage').src = verse.image;
});
