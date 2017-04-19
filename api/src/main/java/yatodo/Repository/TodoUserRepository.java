package yatodo.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import yatodo.Model.TodoUser;

/**
 * Created by pachevjoseph on 4/13/17.
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface TodoUserRepository extends PagingAndSortingRepository<TodoUser, Long> {
    public TodoUser findOneByUsername(String username);

}
