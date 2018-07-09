from django import forms
from .models import Post


class PostForm(forms.ModelForm):
    body = forms.CharField(widget=forms.Textarea(
        attrs={'class': 'formInput', 'placeholder': 'Say Something ...'}))

    class Meta:
        model = Post
        fields = ('body',)

    def save(self, commit=True):
        post = super(PostForm, self).save(commit=False)
        post.body = self.cleaned_data['body']

        if commit:
            post.save()

        return post