from django import template

register = template.Library()

@register.filter(name='bytesToStr')
def byteToStr(b:bytes) :
    return b.decode()