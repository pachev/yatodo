package yatodo.Model;

import javax.persistence.*;

/**
 * Created by pachevjoseph on 4/12/17.
 */

@Entity
public class Item {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String title;
	private String body;
	private boolean completed;

	@ManyToOne()
	@JoinColumn(name="item_group_id")
	private ItemGroup group;

	public Item(){}
	public Item(String title) {
		this.title = title;
	}

	public Item(String title, ItemGroup itemGroup) {
		this.title = title;
		this.group = itemGroup;
	}

	public ItemGroup getGroup() {
		return group;
	}

	public void setGroup(ItemGroup group) {
		this.group = group;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
}
