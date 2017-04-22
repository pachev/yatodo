package yatodo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import yatodo.Model.ItemGroup;

import java.util.List;

/**
 * Created by pachev on 4/13/17.
 * This repository is Spring Data/Spring Jpa's way of providing an
 * interface between teh database and our models. The annotation
 * @RepositoryRestResource wires up our entities so that rest
 * endpoints are created automatically without the need to create
 * specific services or controllers
 */
@RepositoryRestResource(collectionResourceRel = "groups", path = "groups")
@CrossOrigin(origins = "*")
public interface ItemGroupRepository extends PagingAndSortingRepository<ItemGroup, Long>{
    List<ItemGroup> findByName(@Param("name") String name);
}
