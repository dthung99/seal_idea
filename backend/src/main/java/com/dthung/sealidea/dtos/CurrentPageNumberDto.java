package com.dthung.sealidea.dtos;

// So front end could send a number indicating which page user is in and backend send the data back
public class CurrentPageNumberDto {
    private int currentPageNumber;
    private int sizeOfPage;

    // Constructor + Getters and Setters
    public CurrentPageNumberDto() {
    }

    public CurrentPageNumberDto(int currentPageNumber, int sizeOfPage) {
        this.currentPageNumber = currentPageNumber;
        this.sizeOfPage = sizeOfPage;
    }

    public int getCurrentPageNumber() {
        return currentPageNumber;
    }

    public void setCurrentPageNumber(int currentPageNumber) {
        this.currentPageNumber = currentPageNumber;
    }

    public int getSizeOfPage() {
        return sizeOfPage;
    }

    public void setSizeOfPage(int sizeOfPage) {
        this.sizeOfPage = sizeOfPage;
    }

}