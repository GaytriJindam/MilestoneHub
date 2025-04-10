package com.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Chat;
import com.web.model.Project;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    

	Chat findByProject(Project projectById);
	
//	List<Chat> findByProjectNameContainingIgnoreCase(String projectName);
}

