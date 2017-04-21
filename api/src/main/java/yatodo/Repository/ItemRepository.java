package yatodo.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import yatodo.Model.Item;

import java.util.List;

/**
 * Created by pachevjoseph on 4/12/17.
 */
@CrossOrigin(origins = "http://bluff.cs.fiu.edu:4200")
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {

    List<Item> findByTitle(@PathVariable("title") String title);
    List<Item> findByCompleted(@PathVariable("completed")boolean completed);
    int countByGroup_Name(@Param("name") String name);
    long count();

}
