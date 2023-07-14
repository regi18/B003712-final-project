from rest_framework import serializers
from main.models.pdf_issue import PdfIssue
from drf_extra_fields.fields import Base64FileField
from PyPDF2 import PdfReader
from io import BytesIO

class PDFBase64File(Base64FileField):
    ALLOWED_TYPES = ['pdf']

    def get_file_extension(self, filename, decoded_file):
        try:
            PdfReader(BytesIO(decoded_file))
        except Exception as e:
            print(e)
        else:
            return 'pdf'


class PdfIssueSerializer(serializers.ModelSerializer):
    pdf = PDFBase64File()

    class Meta:
        model = PdfIssue
        fields = '__all__'
