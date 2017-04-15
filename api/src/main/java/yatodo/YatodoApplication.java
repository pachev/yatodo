package yatodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yatodo.Model.Item;
import yatodo.Model.ItemGroup;
import yatodo.Model.TodoUser;
import yatodo.Repository.ItemGroupRepository;
import yatodo.Repository.TodoUserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

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
	    //initalize with a two item groups with some items in them
        //Debug purposes only
		TodoUser pachev = new TodoUser("pachev", "password");
		ItemGroup home = new ItemGroup("Home", pachev);
		Set homeItems = new HashSet<Item>(){{
			add(new Item("Call dave", home, pachev));
			add(new Item("kiss wife", home, pachev));
			add(new Item("pet dog", home, pachev));
		}};
		home.setItems(homeItems);

		ItemGroup work = new ItemGroup("Work", pachev);
		Set workItems = new HashSet<Item>(){{
			add(new Item("Finish report b", work, pachev));
			add(new Item("Run tests", work, pachev));
			add(new Item("pet boss", work, pachev));
		}};
		work.setItems(workItems);

		itemGroupRepository.save(new HashSet<ItemGroup>(){{
			add(home);
			add(work);
		}});

		todoUserRepository.save(pachev);
	}

}
