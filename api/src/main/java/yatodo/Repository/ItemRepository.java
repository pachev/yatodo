package yatodo.Repository;

import io.swagger.annotations.Api;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import yatodo.Model.Item;

import java.util.List;

/**
 * Created by pachevjoseph on 4/12/17.
 * This repository is Spring Data/Spring Jpa's way of providing an
 * interface between teh database and our models. The annotation
 * @RepositoryRestResource wires up our entities so that rest
 * endpoints are created automatically without the need to create
 * specific services or controllers
 */
@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends CrudRepository<Item, Long> {

    List<Item> findByTitle(@PathVariable("title") String title);
    List<Item> findByCompleted(@PathVariable("completed")boolean completed);
    int countByGroup_NameAndCompletedFalse(@Param("name") String name);
    long count();

}
