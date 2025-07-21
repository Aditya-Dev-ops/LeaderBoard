import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema({
    claimedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    claimedPoints:Number,
    awardedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    claimedAt:{type:Date , default:Date.now}
},{timestamps:true});

 const ClaimHistory = mongoose.model("ClaimHistory", claimHistorySchema);

 export default ClaimHistory;