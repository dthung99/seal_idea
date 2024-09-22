package com.dthung.sealidea.dtos;

// So front end could send userinfo for register and login
public class DecryptMsgToSendBackDto {
    private String msg;
    private String content;

    // Constructor + Getters and Setters
    public DecryptMsgToSendBackDto() {
    }

    public DecryptMsgToSendBackDto(String msg, String content) {
        this.msg = msg;
        this.content = content;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}