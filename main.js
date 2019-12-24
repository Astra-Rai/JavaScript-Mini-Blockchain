

//E6 format, but the code below yields an error, "unexpected identifier"
//import SHA256 from 'crypto-js/sha256';
//run npm install --save crypto-js
const SHA256 = require ('crypto-js/sha256');

class Block {
    //constructor will receive the properties of each block
    //block properties = index, timestamp, data, and information from the previous hash
    constructor(index, timestamp, data, previousHash = ''){
        //index is optional and tells us where the block sits on the chain
        this.index = index;
        //timestamp tells us when the block was created
        this.timestamp = timestamp; 
        //data could include how much money was transferred and who was the sender and receiver 
        this.data = data;
        //string that contains the hash of prior block
        this.previousHash = previousHash;
        //hash property
        //this contains the calculate the Hash function of the block
        this.hash = this.calculateHash();
        //add nonce
        this.nonce = 0;
    }
    calculateHash(){
        
        //below hash calculation w/o nonce variable 
        //return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
        //below is hash calculation with nonce variable, which is added during proof of work tutorial 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        //we want hash to begin with a certain amount of zeros
        //take substring of hash, start at zero and go up to difficulty
        while(this.hash.substring(0, difficulty) !==Array(difficulty + 1).join('0')){
            //calculate hash of block
            //increment nonce as long as hash doesn't have the correct amount of zeros
            this.nonce++;
            this.hash = this.calculateHash();
        }

        //p[rint hash of block that was mined

       console.log("Block mined: " + this.hash);
    }
}
class Blockcahin{  
    //constructor is responsible for initializes our blockchain
    constructor() {
    //first block on chain is called a genesis block and needs to be added manually    
        this.chain = [this.createGenesisBlock()];
    //add difficulty as a property to the blockchain
    this.difficulty = 4;

    }

    createGenesisBlock(){
        return new Block(0, "11/02/2019", "Genesis block", "0");
    }
    //returns the lastest block in this chain, it will return the last element 
    getLatestBlock(){
        return this.chain[this.chain. length - 1];
    }
    //method will add new block onto the chain
    addBlock(newBlock){
        //get previous hash of block
        newBlock.previousHash = this.getLatestBlock().hash;
        
    
        //newBlock.index = this.getLatestBlock().index + 1;
        //new block always has a new calculated hash
        //line of code below removed during pow tutorial
        //newBlock.hash = newBlock.calculateHash();
        //added line below to factor in difficulty
        newBlock.mineBlock(this.difficulty);
        
        //push new block on chain
        this.chain.push(newBlock);
    }

    //check if chain or hash is vaild?
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false; 
            }
        }
            return true;
    }        
}  
//create an instance of the block chain
let starCoin= new Blockcahin();
/*console log for pow tutorial
expected output 

*/
console.log('Mining block 1....');
starCoin.addBlock(new Block(1, "12/03/2019", {amount: 4}));

console.log('Mining block 2...');
starCoin.addBlock(new Block(2, "12/04/2019", {amount: 10}));

/*
Expected output for console.logs above....

Mining block 1....
Block mined: 00eddd3d9957c382caec3056c8d6de4980d5903083945a08ff4ad39ac8385015
Mining block 2...
Block mined: 00e5de1c264250ec07faf2e4b2d7080edf4e2072818735aea9171703a107ba8f
*/

//second test for code, check to see if chain is valid
//console.log('Is blockcahin valid? ' + starCoin.isChainValid());

//first test of code-console.log(JSON.stringify(starCoin, null, 4));
