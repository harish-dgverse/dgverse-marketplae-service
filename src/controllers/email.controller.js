const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const { favoritesFields, favoritesTokens } = require('./dbUtils/favorites.db');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arunbaby911@gmail.com',
      pass: 'vxhghqnqeimzqlia'
    }
});

async function renderEmailTemplate(templateName, data) {
    const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
    const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
    return ejs.render(templateContent, data);
}

const email = catchAsync(async (req, res) => {
    const {
        name,
        email,
        role,
        otherRole,
        businessFunction,
        reason,
        source,
        comments,
        companyName } = req.body;
    let emailContent;
    if (comments) {
        const email_params = {
            template_form: 'Feedback',
            template_name: name,
            template_email: email,
            template_comments: comments,
        }
        emailContent = await renderEmailTemplate('feedback', email_params);
    } else {
        const email_params = {
            template_form: 'Contact Us',
            template_name: name,
            template_email: email,
            template_role: role,
            template_other_role: otherRole,
            template_business: businessFunction,
            template_reason: reason,
            template_source: source,
            template_company: companyName,
        }
        emailContent = await renderEmailTemplate('contactUs', email_params);
    }

    const mailOptions = {
        from: 'dgverse.future@gmail.com',
        to: 'hello@dgverse.in',
        cc: ['jazeer@dgverse.in', 'arun.menon@dgverse.in', 'harish.haridas@dgverse.in'],
        subject: 'dgVerse user enquiry',
        html: emailContent
    };
    const errorJson = {emailContent};
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            errorJson.error = error;
            errorJson.info = info;
            res.status(500).send({ error, info, email: true, errorJson });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ info });
        }
    });
});

module.exports = {
    email
};
