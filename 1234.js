document.addEventListener('DOMContentLoaded', () => {
    // Animation for sections
    const sections = document.querySelectorAll('.section');
    const checkVisibility = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Run on load
    
    // Video modal functionality
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoLinks = document.getElementsByClassName('video-link');
    const span = document.getElementsByClassName('close')[0];
    
    // Add click event to all video links
    for (let i = 0; i < videoLinks.length; i++) {
        videoLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');
            videoPlayer.querySelector('source').src = videoUrl;
            videoPlayer.load();
            modal.style.display = 'block';
            videoPlayer.play();
        });
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
        videoPlayer.pause();
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            videoPlayer.pause();
        }
    };
});
