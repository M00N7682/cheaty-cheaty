from langchain.document_loaders import PyPDFLoader

def extract_text_from_pdf(pdf_path):
    loader = PyPDFLoader(pdf_path)
    pages = loader.load()
    all_text = "\n".join([page.page_content for page in pages])
    return all_text
