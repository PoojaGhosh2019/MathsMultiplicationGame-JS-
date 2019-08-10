//click on start/reset button
var playing = false;
var score,action,timeRemaining,correctAns;
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing){
        //yes-reload page
        location.reload();
    }else{
        playing = true;
        //no - set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdownbox
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        //hide gameover box
        hide("gameover");
        
        // start countdown
        startCountdown();
        
        //generate new q&A
        generateQA();
        
        
        //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";
    }
}

//functions

//start counter
function startCountdown(){
    action = setInterval(function(){
      timeRemaining -=1;
    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
       //timeleft?
        
        if(timeRemaining == 0) {
           //yes-gameover
            stopCountdown();
            show("gameover");
        document.getElementById("gameover").innerHTML = "<p>game over!</p><p>Your score is "+ score + ".</p>"
            
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            //no-continue 
        }
            
             
    },1000);
}
 
//stop counter
function stopCountdown(){
    clearInterval(action);    
}

//hide elements
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show elements
function show(Id){
   document.getElementById(Id).style.display = "block"; 
}
     
//generate questin and answers
function generateQA(){
    var X = Math.round(Math.random()*9)+ 1;
    var Y = Math.round(Math.random()*9)+1;
    correctAns = X * Y;
    document.getElementById("question").innerHTML = X + "X" + Y;
    
    var correctPosition = Math.round(Math.random()*3)+ 1;
    
   //fill 1 box with correct ans
    document.getElementById("box"+correctPosition).innerHTML = correctAns;
    
    //fill other boxes with wrong ans
    var answers = [correctAns];
    for(i = 1; i < 5 ; i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do{
                 wrongAnswer= Math.round(Math.random()*9)+ 1 * Math.round(Math.random()*9)+ 1;
            }
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}
 

//clicking on answer box
for(i = 1 ; i < 5 ; i++){
    document.getElementById("box" + i).onclick = function(){
    console.log(correctAns);
  //check if we are playing
    if(playing){
        if(this.innerHTML == correctAns){
            //incrementing the score
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct")
            },1000);
            
            //generate new Q&A
            
            generateQA();
        }else{
            //show try again for 1 sec
            
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong")
            },1000);
            
        }
    }
} 
}       



//if we click on answer box
    //if we are playing
        //correct?
            //yes- increase score,show correct box for 1sec,generate new Q&A
            //no- show try again box for 1 sec