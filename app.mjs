
import express from 'express';
let currentx=0;
let currenty=0;
let totaltime=0;
const board = [
    [0, 2, 4, 3, 5, 6, 2, 4],
    [1, 2, 0, 1, 2, 5, 7, 6],
    [0, 3, 1, 4, 2, 7, 10, 7],
    [2, 6, 4, 2, 5, 9, 8, 11],
    [4, 10, 7, 9, 6, 8, 7, 9],
    [4, 7, 5, 8, 8, 6, 13, 10],
    [7, 9, 11, 9, 10, 12, 14, 12],
    [9, 8, 10, 12, 11, 8, 10, 17]
];
//const boardr=board.reverse();
const app = express();

function reduceBoard(x, time)
{
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if(board[row][col]==x)
            {
                board[row][col]-=time;
            }
        }
    }
}
// set up express static
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.get('/', (req,res)=>
{
    let x = req.query.x;
    let y = req.query.y;
    let z = req.query.z;
    let time = req.query.time;
    
    if (x) currentx += parseInt(x); 
    if (y) currenty += parseInt(y); 
    if (time) totaltime+=parseInt(time);

    //console.log(currentx)
    //console.log(currenty)
    //console.log(board[currenty][currentx])
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            board[row][col] = board[row][col].toString().replace('{', '').replace('}', '');
        }
    }
    if(currentx!=0 && currenty!=0)
    {
        reduceBoard(board[currenty][currentx], time);
    }
    board[currenty][currentx] = '{'+board[currenty][currentx]+'}';
    let sendx=currentx+1;
    let sendy=currenty+1;   
    const reversedBoard = board.slice().reverse();
    //console.log(reversedBoard);
    res.render('home',{reversedBoard,sendx,sendy,totaltime});
})

app.listen(3000);
