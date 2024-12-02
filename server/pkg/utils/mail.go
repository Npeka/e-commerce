package utils

import (
	"net/smtp"
)

func SendEmailResetPassword(toEmail, resetUrl string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	email := "seimeicc@gmail.com"
	password := "ctfp eowe ngzu vtma"

	to := []string{toEmail}
	subject := "Subject: Reset Password\n"
	body := "Click this link to reset your password: " + "<a href='" + resetUrl + "'>" + resetUrl + "</a>"
	msg := []byte(subject + "\n" + body)

	auth := smtp.PlainAuth("", email, password, smtpHost)
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, email, to, msg)
	if err != nil {
		return err
	}
	return nil
}
