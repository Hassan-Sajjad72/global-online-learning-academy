import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
    },

    email:
    {
        type: String,
        required: true,
    },

    subject:
    {
        type: String,
        required: true,
    },

    message:
    {
        type: String,
        required: true,
    },

    status:
    {
        type: String,
        default: "Pending"
    }

},
{
    timestamps: true
});

export const Contact = mongoose.model("Contact", ContactSchema);