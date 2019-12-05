

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
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockcahin{  
    //constructor is responsible for initializes our blockchain
    constructor(){
    //first block on chain is called a genesis block and needs to be added manually    
        this.chain = [this.createGenesisBlock()];
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
        newBlock.hash = newBlock.calculateHash();
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
starCoin.addBlock(new Block(1, "12/03/2019", {amount: 4}));
starCoin.addBlock(new Block(2, "12/04/2019", {amount: 10}));


//second test for code
console.log('Is blockcahin valid? ' + starCoin.isChainValid());


//first test of code-console.log(JSON.stringify(starCoin, null, 4));
    
