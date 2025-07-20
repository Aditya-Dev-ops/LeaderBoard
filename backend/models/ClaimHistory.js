import mongoose from "mongoose";

const clainHistorySchema = new mongoose.Schema({
    claimedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    claimedPoints:Number,
    awardedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    claimedAt:{type:Date , default:Date.now}
},{timestamps:true});

 const ClaimHistory = mongoose.model("ClaimHistory", clainHistorySchema);

 export default ClaimHistory;