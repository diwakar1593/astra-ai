package com.astra.ai.provider.factory;

import com.astra.ai.provider.AIProvider;
import com.astra.ai.provider.ProviderType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class AIProviderFactory {

    private final Map<ProviderType, AIProvider> providers =
            new EnumMap<>(ProviderType.class);

    public AIProviderFactory(List<AIProvider> providerList) {

        providerList.forEach(provider -> {

            providers.put(
                    provider.getProviderType(),
                    provider
            );

            log.info("Registered AI Provider : {}",
                    provider.getProviderType());

        });

    }

    public AIProvider getProvider(ProviderType providerType) {

        AIProvider provider = providers.get(providerType);

        if (provider == null) {
            throw new IllegalArgumentException(
                    "No AI Provider found for " + providerType
            );
        }

        return provider;

    }
}