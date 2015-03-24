from xlrd import open_workbook
# Choose one of the above

def main():
    # These could be function args in real live code
    file_path = 'pneumonia.xlsx'

    # The action starts here
    book = open_workbook(file_path)
    sheet = book.sheet_by_index(0) # first worksheet
    sheet.cell_value('A1')
    print dir(sheet)

if __name__ == '__main__':
    main()