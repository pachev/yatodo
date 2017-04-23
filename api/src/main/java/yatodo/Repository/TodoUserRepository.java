package yatodo.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import yatodo.Model.TodoUser;

/**
 * Created by pachevjoseph on 4/13/17.
 * This repository is Spring Data/Spring Jpa's way of providing an
 * interface between teh database and our models. The annotation
 * @RepositoryRestResource wires up our entities so that rest
 * endpoints are created automatically without the need to create
 * specific services or controllers
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@CrossOrigin(origins = "*")
public interface TodoUserRepository extends CrudRepository<TodoUser, Long> {
    //Search method for finding a user by username
    public TodoUser findOneByUsername(String username);

}
