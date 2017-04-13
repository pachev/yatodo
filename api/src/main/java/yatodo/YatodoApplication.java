package yatodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import yatodo.Model.Item;
import yatodo.Model.ItemGroup;
import yatodo.Repository.ItemGroupRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class YatodoApplication implements CommandLineRunner{

	@Autowired
	private ItemGroupRepository itemGroupRepository;

	public static void main(String[] args) {
		SpringApplication.run(YatodoApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... strings) throws Exception {
	    //initalize with a two item groups with some items in them
		ItemGroup home = new ItemGroup("Home");
		Set homeItems = new HashSet<Item>(){{
			add(new Item("Call dave", home));
			add(new Item("kiss wife", home));
			add(new Item("pet dog", home));
		}};
		home.setItems(homeItems);

		ItemGroup work = new ItemGroup("Work");
		Set workItems = new HashSet<Item>(){{
			add(new Item("Finish report b", work));
			add(new Item("Run tests", work));
			add(new Item("pet boss", work));
		}};
		work.setItems(workItems);

		itemGroupRepository.save(new HashSet<ItemGroup>(){{
			add(home);
			add(work);
		}});
	}

}
