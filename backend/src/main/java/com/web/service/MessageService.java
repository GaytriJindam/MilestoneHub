package com.web.service;

import java.util.List;

import com.web.exception.ChatException;
import com.web.exception.ProjectException;
import com.web.exception.UserException;
import com.web.model.Message;

public interface MessageService {

    Message sendMessage(Long senderId, Long chatId, String content) throws UserException, ChatException, ProjectException;

    List<Message> getMessagesByProjectId(Long projectId) throws ProjectException, ChatException;
}

