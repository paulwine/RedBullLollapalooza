let video = document.querySelector('video');
video.load();

video.onload = function(){
    video.play();
}