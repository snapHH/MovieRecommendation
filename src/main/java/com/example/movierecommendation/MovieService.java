package com.example.movierecommendation;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class MovieService {

    private final String API_KEY = "d5e1c8ae861af749b74b4de0adb15a74";
    private final String BASE_URL = "https://api.themoviedb.org/3/movie/popular";

    public List<Map<String, Object>> getMovies() {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + "?api_key=" + API_KEY;

        // Make the request to TMDb API and map the response to a Map
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        // Extract the "results" array from the response
        List<Map<String, Object>> movies = (List<Map<String, Object>>) response.get("results");

        return movies;
    }
}
