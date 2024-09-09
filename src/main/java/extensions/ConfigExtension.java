package extensions;

import com.esotericsoftware.yamlbeans.YamlReader;
import constants.string.CharsetConstants;
import extensions.config.CustomConfig;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ConfigExtension {
    private static final String CONFIG_FILE_NAME = "config-extension.yaml";
    public static final ConfigExtension config = loadConfig();

    public CustomConfig custom;

    private static ConfigExtension loadConfig() {
        try {
            YamlReader reader = new YamlReader(Files.newBufferedReader(Path.of(CONFIG_FILE_NAME), CharsetConstants.CHARSET));
            ConfigExtension config = reader.read(ConfigExtension.class);
            reader.close();
            return config;
        } catch (FileNotFoundException e) {
            throw new RuntimeException("Could not read config file " + CONFIG_FILE_NAME + ": " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException("Could not successfully parse config file " + CONFIG_FILE_NAME + ": " + e.getMessage());
        }
    }
}
