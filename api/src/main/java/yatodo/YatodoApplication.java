package yatodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import yatodo.Controller.AuthController;
import yatodo.Model.Item;
import yatodo.Model.ItemGroup;
import yatodo.Model.TodoUser;
import yatodo.Repository.ItemGroupRepository;
import yatodo.Repository.TodoUserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Import({springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration.class})
@SpringBootApplication
public class YatodoApplication implements CommandLineRunner{

	@Autowired
	private ItemGroupRepository itemGroupRepository;

	@Autowired
	private TodoUserRepository todoUserRepository;

	public static void main(String[] args) {
		SpringApplication.run(YatodoApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... strings) throws Exception {

	}

}
