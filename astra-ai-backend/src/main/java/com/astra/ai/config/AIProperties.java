package com.astra.ai.config;

import com.astra.ai.provider.ProviderType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "astra.ai")
public class AIProperties {

    private ProviderType provider = ProviderType.OLLAMA;

}