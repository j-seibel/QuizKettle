// validates the answer with regex
function validateNAQT(playerAnswer , ans){
 //   console.log(ans);
    playerAnswer = playerAnswer.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim, "");
    
   // console.log(ans);
    ans = ans.replace(/(.*?)/g, "");
    let ansArr = [];
    ansArr.push(ans);
    while(ans.indexOf('<strong>') > -1){
        let temp = ans.substring(ans.indexOf('<strong>') +8, ans.indexOf('</strong'));
        ans = ans.replace('<strong>');
        ans = ans.replace('</strong>');
        ansArr.push(temp);
    }

    for(let i =0; i< ansArr.length; i+= 1){
        let answer = ansArr[i];
        answer = answer.replace(/<.*?>/gm, "");
        answer = answer.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim, "");
        ansArr[i] = answer.trim();
    }
    
    ans.replace(/(.*?)/g, "")
    ans.replace(/[.*?]/g, "")
    ansArr.push(ans);
   // console.log(ansArr);
     const str1 = ansArr;
     const str2 = playerAnswer;
        //console.log(str1)
 
 
     for(let i =0; i< str1.length; i+=1){
 
     const levenshteinDistance = (str1 = '', str2 = '') => {
        const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
           track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
           track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
           for (let i = 1; i <= str1.length; i += 1) {
              const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
              track[j][i] = Math.min(
                 track[j][i - 1] + 1, // deletion
                 track[j - 1][i] + 1, // insertion
                 track[j - 1][i - 1] + indicator, // substitution
              );
           }
        }
        return track[str2.length][str1.length] < str1.length / 2;;
     };
     if(levenshteinDistance(str1[i], str2)){
       return true;
     }
    }
    return false;
 }

 
 module.exports = validateNAQT;