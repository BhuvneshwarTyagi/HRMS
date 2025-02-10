const MONODBB_URI="mongodb+srv://bhuvneshwar:GeFCbMJVWo9f2XbD@cluster0.2qnthel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT=8000;
const ACCESS_TOKEN_SECRET="3e9af42de397cfc9387a06972c28c23a1ac7e9a60fb6dc1f05295bc6057baf500672d4a13db5d04ea84bbc4c5679164a7723f3d49f516bb73dc3df6e3b768c8e";
const REFRESH_TOKEN_SECRET="56a6d157ad7d2ee09e480960ae857e528ae546d156f47433b1afad162311c45aa520697b65d13a5c72891f6145ab1f2675886fc124027dc95f86073dd8fe1462";
const Access_Expiry='7d';
const Refresh_EXPIRY="30d";

module.exports = {MONODBB_URI,PORT,Refresh_EXPIRY,ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET,Access_Expiry};
