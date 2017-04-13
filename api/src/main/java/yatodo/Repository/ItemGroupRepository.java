package yatodo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import yatodo.Model.ItemGroup;

import java.util.List;

/**
 * Created by pachev on 4/13/17.
 */
@RepositoryRestResource(collectionResourceRel = "groups", path = "groups")
public interface ItemGroupRepository extends PagingAndSortingRepository<ItemGroup, Long>{
    List<ItemGroup> findByName(@Param("name") String name);
}
