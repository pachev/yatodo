package yatodo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import yatodo.Model.Item;

import java.util.List;

/**
 * Created by pachevjoseph on 4/12/17.
 */
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    List<Item> findByTitle(@Param("title") String title);
    List<Item> findByCompleted(@Param("completed")boolean completed);
}
