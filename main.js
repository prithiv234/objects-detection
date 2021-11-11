song1="";
song2="";

song1status="";
song2status="";
scoreleft_wrist=0;
left_wristX=0;
left_wristY=0;

scoreright_wrist=0;
right_wristX=0;
right_wristY=0;

function preload()
{
  song1=loadSound("music.mp3");
  song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("blue");
    stroke("yellow");
    if(scoreright_wrist>0.2){
      circle(right_wristX,right_wristY,20);
      song1.stop();
      if(song2status==false){
        song2.play();
        document.getElementById("song").innerHTML="playing-peter pan"
      }
    }
    if(scoreleft_wrist>0.2){
      circle(left_wristX,left_wristY,20);
      song2.stop();
      if(song1status==false){
        song1.play();
        document.getElementById("song").innerHTML="playing-harry potter"
      }
    }
}

function play()
{
   song.play();
   song.setVolume(1);
   song.rate(1);
}
function gotPoses(results)
{
  if(results.length>0)
  {
    console.log(results);

    scoreleft_wrist=results[0].pose.keypoints[9].score;
    scoreright_wrist=results[0].pose.keypoints[10].score;

    left_wristX=results[0].pose.leftWrist.x;
    left_wristY=results[0].pose.leftWrist.y;
    console.log("leftWristX =" + left_wristX +"leftWristY = " + left_wristY);

    right_wristX=results[0].pose.rightWrist.x;
    right_wristY=results[0].pose.rightWrist.y;
    console.log("right_WristX =" + right_wristX +"rightWristY = " + right_wristY);
  }
}