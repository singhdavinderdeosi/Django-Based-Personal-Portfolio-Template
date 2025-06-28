from django import forms
from django.core.mail import send_mail
from django.conf import settings

class ContactForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        data = self.cleaned_data
        send_mail(
            f"New message from {data['name']}",
            data['message'],
            data['email'],
            [settings.DEFAULT_FROM_EMAIL],
        )
