package yatodo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import yatodo.Model.Item;

/**
 * Created by pachevjoseph on 4/12/17.
 */
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends CrudRepository<Item, Long> {
}
