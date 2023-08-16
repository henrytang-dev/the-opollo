package com.thefoundry.backend.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.io.IOException;
import java.util.Map;

//@Converter
public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(Map<String, Object> blogData) {
        String blogDataJson = null;
        try {
            blogDataJson = objectMapper.writeValueAsString(blogData);
        } catch (final JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return blogDataJson;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String blogDataJson) {
        Map<String, Object> blogData = null;
        try {
            blogData = objectMapper.readValue(blogDataJson, new TypeReference<Map<String, Object>>() {
            });
        } catch (final IOException e){
            throw new RuntimeException(e);
        }

        return blogData;
    }
}
