
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('footballApp', ['ngRoute']); 


// this is without $scope


  myApp.controller('mainController',['$http','$routeParams',function($http,$routeParams) {


  //create a context
  var main = this;

  this.roundindex = $routeParams.round;
  this.matchindex = $routeParams.match;
  this.matchyear = $routeParams.matchyear;

  this.year = ["2015/16", "2016/17"];
  this.club2015 = ["Manchester United","Tottenham Hotspur","Bournemouth","Aston Villa","Everton","Watford","Leicester City","Sunderland","Norwich","Crystal Palace","Chelsea","Swansea","Arsenal","West Ham United","Newcastle United","Southampton","Stoke City","West Bromwich Albio","Liverpool","Manchester City"];
  this.club2016 = ["Manchester United","Hull City","Middlesbrough","Burnley","Tottenham Hotspur","Bournemouth","Everton","Watford","Leicester City","Sunderland","Crystal Palace","Chelsea","Swansea","Arsenal","West Ham United","Southampton","Stoke City","West Bromwich Albio","Liverpool","Manchester City"];
  this.club = ["Manchester United","Tottenham Hotspur","Bournemouth","Aston Villa","Everton","Watford","Leicester City","Sunderland","Norwich","Crystal Palace","Chelsea","Swansea","Arsenal","West Ham United","Newcastle United","Southampton","Stoke City","West Bromwich Albio","Liverpool","Manchester City","Hull City","Middlesbrough","Burnley"];
  //this.result1 =["0-0","0-1","1-0","2-0","0-2","2-1","1-2","2-2","3-0","0-3","3-1","1-3","3-2","2-3","3-3","4-0","0-4","4-1","1-4","4-2","2-4","4-3","3-4","4-4"];
  this.result=["home team win","draw","home team loss"];
  this.pageHeading = 'Welcome to English Premiur Leaque';
  this.pageSubHeading = 'A page with details of each match of English Premiur Leaque for 2015-16 and 2016-17 season'
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.match2015 = [];
  this.season2015 = '';
  this.match2016 = [];
  this.season2016 = '';

 

  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.anotherUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';



  this.won=0;
  this.drawn=0;
  this.lost=0;
  this.goalfor=0;
  this.goalagainst=0;
  this.gd=0;
  this.points=0;
  this.team1;
  this.team2;
  this.code1;
  this.code2;
  this.season = {};
  this.match ={};
  this.obj= [];
  
  
  this.finalarray=[];

  //Function to calculate stats for each team

  this.calcMatchstats = function(obj){
        this.finalobj={};


      
      var round;
      for (round = 0; round < obj.length; round++) {
            var mat;
            for (mat = 0; mat < obj[round].matches.length; mat++) {

                        
                        
                         main.code1=obj[round].matches[mat].team1.code;
                         main.code2=obj[round].matches[mat].team2.code;
                         main.team1=obj[round].matches[mat].team1.name;
                         main.team2=obj[round].matches[mat].team2.name;
                         main.score1=obj[round].matches[mat].score1;
                         main.score2=obj[round].matches[mat].score2;
                         

                          main.item = {};
                          
                          main.item ["team"] = main.team1;
                          

                         
                          
                       

                          if (!(main.code1 in main.finalobj)) {
                              

                                        if (main.score1 > main.score2){
                                           main.won=1;
                                           main.drawn=0;
                                            main.lost=0;
                                            main.goalfor=main.score1;
                                            main.goalagainst=main.score2;
                                            main.gd=(main.score1 - main.score2);
                                            main.points=3;
                                            main.item ["won"] = main.won;
                                            main.item ["drawn"] = main.drawn;
                                            main.item ["lost"] = main.lost;
                                            main.item ["goalfor"] = main.goalfor;
                                            main.item ["goalagainst"] = main.goalagainst;
                                            main.item ["gd"] = main.gd;
                                            main.item ["points"] = main.points;
                                            main.finalobj[main.code1]=main.item;
                
                                          }
                                          else if(main.score1 == main.score2){

                                                main.won=0;
                                                main.drawn=1;
                                                 main.lost=0;
                                                main.goalfor=main.score1;
                                                main.goalagainst=main.score2;
                                                 main.gd=(main.score1 - main.score2);
                                                  main.points=1;
                                                  main.item ["won"] = main.won;
                                                  main.item ["drawn"] = main.drawn;
                                                  main.item ["lost"] = main.lost;
                                                  main.item ["goalfor"] = main.goalfor;
                                                  main.item ["goalagainst"] = main.goalagainst;
                                                   main.item ["gd"] = main.gd;
                                                   main.item ["points"] = main.points;
                                                   main.finalobj[main.code1]=main.item;
                 

                 

                                          }else{

                                                 main.won=0;
                                                main.drawn=0;
                                                main.lost=1;
                                                main.goalfor=main.score1;
                                                main.goalagainst=main.score2;
                                                main.gd=(main.score1 - main.score2);
                                                main.points=0;
                                                main.item ["won"] = main.won;
                                                main.item ["drawn"] = main.drawn;
                                                main.item ["lost"] = main.lost;
                                                main.item ["goalfor"] = main.goalfor;
                                                main.item ["goalagainst"] = main.goalagainst;
                                                main.item ["gd"] = main.gd;
                                                main.item ["points"] = main.points;
                                                main.finalobj[main.code1]=main.item;
                  

               
                                           }
                            }else if (main.code1 in main.finalobj){
                                   
                                             
                                             if (main.score1 > main.score2){
                                                   main.finalobj[main.code1].won+=1;
                                                   main.finalobj[main.code1].goalfor+=main.score1;
                                                   main.finalobj[main.code1].goalagainst+=main.score2;
                                                   main.finalobj[main.code1].gd+=(main.score1-main.score2);
                                                  main.finalobj[main.code1].points+=3;
                                               
          
                                                  } else if (main.score1 == main.score2){
                                                    main.finalobj[main.code1].drawn+=1;
                                                   main.finalobj[main.code1].goalfor+=main.score1;
                                                   main.finalobj[main.code1].goalagainst+=main.score2;
                                                    main.finalobj[main.code1].points+=1;
                                                    
                                                   

                                                    }  else{
                                                                   main.finalobj[main.code1].lost+=1;
                                                                   main.finalobj[main.code1].goalfor+=main.score1;
                                                                   main.finalobj[main.code1].goalagainst+=main.score2;
                                                                   main.finalobj[main.code1].gd+=(main.score1-main.score2);
                                                                   
                                                                  

                                                             }
                                }

                                main.item = {};
                                main.item ["team"] = main.team2;

                                if (!(main.code2 in main.finalobj)) {
                                        

                                        if (main.score1 < main.score2){
                                           main.won=1;
                                           main.drawn=0;
                                            main.lost=0;
                                            main.goalfor=main.score2;
                                            main.goalagainst=main.score1;
                                            main.gd=(main.score2 - main.score1);
                                            main.points=3;
                                            main.item ["won"] = main.won;
                                            main.item ["drawn"] = main.drawn;
                                            main.item ["lost"] = main.lost;
                                            main.item ["goalfor"] = main.goalfor;
                                            main.item ["goalagainst"] = main.goalagainst;
                                            main.item ["gd"] = main.gd;
                                            main.item ["points"] = main.points;
                                            main.finalobj[main.code2]=main.item;
                
                                          }
                                          else if(main.score1 == main.score2){

                                                main.won=0;
                                                main.drawn=1;
                                                 main.lost=0;
                                                main.goalfor=main.score2;
                                                main.goalagainst=main.score1;
                                                 main.gd=(main.score2 - main.score1);
                                                  main.points=1;
                                                  main.item ["won"] = main.won;
                                                  main.item ["drawn"] = main.drawn;
                                                  main.item ["lost"] = main.lost;
                                                  main.item ["goalfor"] = main.goalfor;
                                                  main.item ["goalagainst"] = main.goalagainst;
                                                   main.item ["gd"] = main.gd;
                                                   main.item ["points"] = main.points;
                                                   main.finalobj[main.code2]=main.item;
                 

                 

                                          }else{

                                                 main.won=0;
                                                main.drawn=0;
                                                main.lost=1;
                                                main.goalfor=main.score2;
                                                main.goalagainst=main.score1;
                                                main.gd=(main.score2 - main.score1);
                                                main.points=0;
                                                main.item ["won"] = main.won;
                                                main.item ["drawn"] = main.drawn;
                                                main.item ["lost"] = main.lost;
                                                main.item ["goalfor"] = main.goalfor;
                                                main.item ["goalagainst"] = main.goalagainst;
                                                main.item ["gd"] = main.gd;
                                                main.item ["points"] = main.points;
                                                main.finalobj[main.code2]=main.item;
                  

               
                                           }
                            }else if (main.code2 in main.finalobj){
                                    
                                             
                                             if (main.score1 < main.score2){
                                                   main.finalobj[main.code2].won+=1;
                                                   main.finalobj[main.code2].goalfor+=main.score2;
                                                   main.finalobj[main.code2].goalagainst+=main.score1;
                                                   main.finalobj[main.code2].gd+=(main.score2-main.score1);
                                                  main.finalobj[main.code2].points+=3;
                                               
          
                                                  } else if (main.score1 == main.score2){
                                                    main.finalobj[main.code2].drawn+=1;
                                                   main.finalobj[main.code2].goalfor+=main.score2;
                                                   main.finalobj[main.code2].goalagainst+=main.score1;
                                                    main.finalobj[main.code2].points+=1;
                                                    
                                                   

                                                    }  else{
                                                                   main.finalobj[main.code2].lost+=1;
                                                                   main.finalobj[main.code2].goalfor+=main.score2;
                                                                   main.finalobj[main.code2].goalagainst+=main.score1;
                                                                   main.finalobj[main.code2].gd+=(main.score2-main.score1);
                                                                   
                                                                  

                                                             }
                                }

                                  

            }
    
      }

      main.finalarray.push(main.finalobj);
    
       
}


  //Function to fetch data from API


  this.loadAllMatch = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
         main.season2015=response.data.name;
          main.match2015 = response.data.rounds;
         
         // console.log(main.matchyear);
         main.calcMatchstats(main.match2015);




        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
         // console.log(response);

        });


      $http({
        method: 'GET',
        url: main.anotherUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.season2016=response.data.name;
          main.match2016 = response.data.rounds;

          main.calcMatchstats(main.match2016);
          


        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          //console.log(response);

        });

       
        

  }

  this.loadAllMatch();

 


}]); // end controller


//Custom filters to convert object to array

myApp.filter('myfilter',function(){
    return function(data)
    {
        var newRes = [];
        angular.forEach(data,function(val,key){
            val["id"] = key;  //Add the ID in the JSON object as you need this as well.
            newRes.push(val);
        });
        return newRes;
    }






});


//Custom filters to add win/loss/draw for team

myApp.filter('search', function() {

  
  return function(input) {

var out = [];


angular.forEach(input, function(match) {

      if (match.score1 > match.score2) {
         
        match["result"]="home team win";
       
        out.push(match);
      }else if(match.score1 === match.score2) {
        
        match["result"]="draw";
       
        out.push(match);
    }else{
       
       match["result"]="home team loss";

        out.push(match);
  }

    })

    return out;
  }

});





